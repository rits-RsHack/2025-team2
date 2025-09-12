from flask import Blueprint, request, jsonify
from app.services import posts as post_service

posts_bp = Blueprint('posts', __name__, url_prefix='/api')

@posts_bp.route('/posts', methods=['POST'])

def create_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    author_id = data.get('author_id')
    study_hours = data.get('study_hours', 0)
    panorama_video = data.get('panorama_video')
    
    if not title or not content or not author_id:
        return jsonify({"error": "Title, content, and author_id are required."}), 400
    
    try:
        post = post_service.create_post(title, content, author_id, study_hours, panorama_video)
        return jsonify(post.to_dict()), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
@posts_bp.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    try:
        post = post_service.get_post_by_id(post_id)
        if not post:
            return jsonify({"error": "Post not found."}), 404
        return jsonify(post.to_dict()), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
    
    
    
