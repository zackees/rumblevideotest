import webbrowser
import os
import sys

HERE = os.path.dirname(__file__)
os.chdir(HERE)

PYTHON_EXE = sys.executable

PORT = 7002
webbrowser.open(f'http://localhost:{PORT}/mainpage.html')
try:
    os.system(f'"{PYTHON_EXE}" -m http.server {PORT}')
except KeyboardInterrupt:
    pass