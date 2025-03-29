import argparse
import uvicorn
from app.main import app

def main():
    parser = argparse.ArgumentParser(description='Run the Daily Plan API')
    parser.add_argument('--dev', action='store_true', help='Run in development mode')
    args = parser.parse_args()

    port = 8001 if args.dev else 8003
    host = "0.0.0.0"
    reload = args.dev

    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=reload
    )

if __name__ == "__main__":
    main() 