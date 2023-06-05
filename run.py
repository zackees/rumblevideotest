import webbrowser
import os

HERE = os.path.dirname(__file__)
os.chdir(HERE)

PORT = 7002
webbrowser.open(f'http://localhost:{PORT}/mainpage.html')
try:
    os.system(f'python -m http.server {PORT}')
except KeyboardInterrupt:
    pass