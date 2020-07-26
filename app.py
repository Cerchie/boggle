from boggle import Boggle
from flask import Flask, request, redirect, render_template, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from unittest import TestCase


app = Flask(__name__)

# Ensure that debug mode is *on*
app.debug = True

app.config['SECRET_KEY'] = "oh-so-secret"
toolbar = DebugToolbarExtension(app)

boggle_game = Boggle()


@app.route("/")
def return_board():
    """return boggle board and render the template"""

    board = boggle_game.make_board()

    return render_template("board.html", board=board)
