import webbrowser
import os

HERE = os.path.dirname(__file__)
os.chdir(HERE)

PORT = 7000
webbrowser.open(f'http://localhost:{PORT}')
os.system(f'python -m http.server {PORT}')