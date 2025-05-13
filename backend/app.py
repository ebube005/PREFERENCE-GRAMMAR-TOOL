from flask import Flaxk, request, jsonify 
app = Flask(__name__)
def invert_ranking(ranking):
    return {k: 1 / v for k, v in ranking.items()}

def build_ahp_matrix(scores):
    keys = list(scores.keys())
    size = len(keys)
    matrix = []
    for i in range(size):
        row = []
        for j in range(size):
            row.append(scores[keys[i]] / scores[keys[j]])
        matrix.append(row)
    return matrix, keys

def compute_ahp_weights(matrix):
    size = len(matrix)
    col_sums = [sum(matrix[i][j] for i in range(size)) for j in range(size)]
    norm_matrix = [
        [matrix[i][j] / col_sums[j] for j in range(size)]
        for i in range(size)
    ]
    weights = [sum(row) / size for row in norm_matrix]
    return weights
def run_ahp(user_ranking):
    adjusted_scores = invert_ranking(user_ranking)
    matrix, keys = build_ahp_matrix(adjusted_scores)
    weights = compute_ahp_weights(matrix)
    return dict(zip(keys, weights))

# --------- API Route ---------

@app.route("/ahp", methods=["POST"])
def ahp_endpoint():
    data = request.get_json()
    user_ranking = data.get("ranking")

    if not user_ranking:
        return jsonify({"error": "Missing 'ranking' field in request"}), 400

    weights = run_ahp(user_ranking)
    return jsonify({"weights": weights})

# --------- Main Entry Point ---------

if __name__ == "__main__":
    app.run(debug=True)