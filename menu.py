"""
This is the menu module and supports all the REST actions for the
MENU collection
"""

# 3rd party modules
from flask import make_response, abort

def read_all():
    """
    This function responds to a request for /api/menu
    with the complete lists of menu
    :return:        json string of list of menu
    """
    # Create the list of menu from our data
    return [MENU[key] for key in sorted(MENU.keys())]


def read_one(price):
    """
    This function responds to a request for /api/menu/{price}
    with one matching food from menu
    :param price:   last name of food to find
    :return:        food matching last name
    """
    # Does the food exist in menu?
    if price in MENU:
        food = MENU.get(price)

    # otherwise, nope, not found
    else:
        abort(
            404, "Food with price {price} not found".format(price=price)
        )

    return food




def update(count):
    """
    This function updates an existing count of chosen menus in the menu list
    :param price:   last name of food to update te count from in the menu structure
    :param food:  food to update count from
    :param count: count to update
    :return:        updated food structure
    """
    # Does the food exist in menu?
    if price in MENU:
        MENU[price]["meal"] = food.get("meal")
        MENU[price]["count"] = get_count()

        return MENU[count]

    # otherwise, nope, that's an error
    else:
        abort(
            404, "Food with price {price} not found".format(price=price)
        )
