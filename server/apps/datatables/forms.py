from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FileField
from wtforms.validators import Email, DataRequired


class DatatableForm(FlaskForm):
    type = SelectField('Type', id='type', choices=[("product", "Product"), (
        "transaction", "Transaction")], render_kw={'class': 'form-select type'})
    name = StringField('Name', id='name', validators=[
                       DataRequired()], render_kw={'class': 'form-control name'})
    value = StringField('Value', id='value', validators=[
                        DataRequired()], render_kw={'class': 'form-control value'})
