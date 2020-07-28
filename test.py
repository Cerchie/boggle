from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    # GET requests______________________________


def test_homepage(self):
    with app.test_client() as client:
        resp = client.get('/')
        html = resp.get_data(as_text=True)
        self.assertEqual(resp.status_code, 200)
        self.assertIn('<section id="boggle">', html)


# POST and FormData

# Redirects
