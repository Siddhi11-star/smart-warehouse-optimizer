from flask import Blueprint, jsonify, request
from services.product_service import ProductService

product_bp = Blueprint('products', __name__, url_prefix='/api/products')

@product_bp.route('', methods=['GET'])
def get_products():
    return jsonify({"products": ProductService.get_all_products()})

@product_bp.route('', methods=['POST'])
def add_product():
    data = request.get_json() or {}
    return jsonify({"product": ProductService.create_product(data)}), 201
