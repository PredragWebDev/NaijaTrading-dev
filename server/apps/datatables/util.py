import math


def set_pagination(page, ITEMS_PER_PAGE, total_items, paginated_data):

    pages_number = math.ceil(total_items / ITEMS_PER_PAGE)

    page_range = None
    if page in range(1, 7) and pages_number >= 7:
        page_range = [i for i in range(1, 8)]
        page_range += ['...']
    elif page >= 7 and (page + 6) < pages_number:
        page_range = ['...']
        page_range += [i for i in range(page - 3, page + 4)]
        page_range += ['...']
    elif page in range(pages_number - 7, pages_number + 1):
        page_range = ['...']
        page_range += [i for i in range(pages_number - 7, pages_number + 1)]

    return {'page': page,
            'has_prev': paginated_data.has_prev,
            'has_next': paginated_data.has_next,
            'page_range': page_range,
            'item_per_page': ITEMS_PER_PAGE,
            'total_items': total_items,
            'items_shown': len(paginated_data.items)}
