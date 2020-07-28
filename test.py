from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):


    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True


    def test_homepage(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<section id="boggle">', html)


    def test_checkword(self):
        with app.test_client() as client:
            resp = client.get('/check-word')
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)


    def test_postscore(self):
        with app.test_client() as client:
            resp = client.get('/post-score')
            html = resp.get_data(as_text=True)
         
