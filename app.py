from boggle import Boggle
from flask import Flask, request, redirect, render_template, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from unittest import TestCase


app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

app = Flask(__name__)


boggle_game = Boggle()


@app.route("/")
def return_board():
    """return boggle board and render the template"""

    board = Boggle.make_board(self)

    return render_template("board.html", board=board)