from flask import render_template, request, jsonify, url_for, redirect, session
from sqlalchemy import or_

from apps import db

from apps.datatables import blueprint
from apps.home.models import Data
from apps.datatables.util import set_pagination
from apps.datatables.forms import DatatableForm


@blueprint.route('/transactions.html')
def transactions():

    if "ITEMS_PER_PAGE" not in session:
        session["ITEMS_PER_PAGE"] = 10

    search = request.args.get("search")
    if search:
        ITEMS_PER_PAGE = session["ITEMS_PER_PAGE"]
        page = request.args.get('page', 1, type=int)

        total_items = Data.query.count()
        paginated_data = Data.query.filter(or_(Data.name.like(
            search), Data.value.like(search))).paginate(page, ITEMS_PER_PAGE, False)
    else:
        ITEMS_PER_PAGE = session["ITEMS_PER_PAGE"]
        page = request.args.get('page', 1, type=int)

        total_items = Data.query.count()
        paginated_data = Data.query.paginate(page, ITEMS_PER_PAGE, False)

    pagination = set_pagination(
        page, ITEMS_PER_PAGE, total_items, paginated_data)

    return render_template('datatables/list.html',
                           data_list=paginated_data.items,
                           pagination=pagination,
                           segment="datatables")


@blueprint.route('/transactions_rows_per_page/<int:rows>')
def transactions_rows_per_page(rows):
    session["ITEMS_PER_PAGE"] = int(rows)
    return redirect(url_for('datatables_blueprint.transactions'))


@blueprint.route('/edit/<id>', methods=["GET", "POST"])
def edit(id):

    data = Data.query.get(id)
    form = DatatableForm(obj=data)

    if form.validate_on_submit():
        form.populate_obj(data)

        db.session.add(data)
        db.session.commit()

        return redirect(url_for('datatables_blueprint.transactions'))

    return render_template('datatables/edit.html', form=form, data=data, segment="datatables")


@blueprint.route('/edit_row/<id>', methods=["GET", "PUT"])
def edit_row(id):

    data = Data.query.get(id)

    # handle PUT request
    if request.method == "PUT":

        # check if any of 'value' or 'name' fields are available for update
        new_data_available = False

        if "value" in request.form:
            data.value = request.form["value"]
            new_data_available = True
        if "name" in request.form:
            data.name = request.form["name"]
            new_data_available = True

        if new_data_available:

            db.session.add(data)
            db.session.commit()

            updated_data = Data.query.get(id)
            edit_row = render_template(
                'datatables/edit_row.html', form=None, data=updated_data)
            return jsonify({'valid': 'success', 'message': 'Transaction saved successfully', 'edit_row': edit_row})

        updated_data = Data.query.get(id)
        edit_row = render_template(
            'datatables/edit_row.html', form=None, data=updated_data)
        return jsonify({'valid': 'warning', 'message': 'Error Occurred. Please try again.', 'edit_row': edit_row})

    data = Data.query.get(id)
    form = DatatableForm(obj=data)

    return render_template('datatables/edit_row.html', form=form, data=data)


@blueprint.route('/row_details/<id>')
def row_details(id):
    data = Data.query.get(id)

    return render_template('datatables/edit_row.html', form=None, data=data)


@blueprint.route('/row_delete/<id>', methods=["DELETE"])
def row_delete(id):
    data = Data.query.get(id)
    db.session.delete(data)
    db.session.commit()

    response = {'valid': 'success',
                'message': 'Item deleted successfully', 'redirect_url': None}
    return jsonify(response)


@blueprint.route('/row_delete/<id>/single', methods=["DELETE"])
def row_delete_single(id):
    data = Data.query.get(id)
    db.session.delete(data)
    db.session.commit()

    redirect_url = url_for('datatables_blueprint.transactions')
    response = {'valid': 'success',
                'message': 'Item deleted successfully', 'redirect_url': redirect_url}
    return jsonify(response)
