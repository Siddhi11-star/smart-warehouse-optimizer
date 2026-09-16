from flask import Blueprint, jsonify
from services.shelf_optimization_service import ShelfOptimizationService

shelf_opt_bp = Blueprint('shelf_optimization', __name__, url_prefix='/api/optimize/shelves')

@shelf_opt_bp.route('', methods=['POST'])
def run_shelf_optimization():
    result = ShelfOptimizationService.optimize_shelf_allocation()
    return jsonify(result)
