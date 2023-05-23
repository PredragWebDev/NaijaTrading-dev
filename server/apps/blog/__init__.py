from flask import Blueprint

blueprint = Blueprint(
    'blog_blueprint',
    __name__,
    url_prefix=''
)
