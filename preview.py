#!/usr/bin/env python3
"""Preview this portfolio over local HTTP without changing the website files."""

import argparse
import errno
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser


class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Robots-Tag", "noindex")
        super().end_headers()


def port_number(value):
    try:
        port = int(value)
    except ValueError:
        raise argparse.ArgumentTypeError("Port must be a number from 0 to 65535.")
    if not 0 <= port <= 65535:
        raise argparse.ArgumentTypeError("Port must be a number from 0 to 65535.")
    return port


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--port", type=port_number, default=8000,
        help="Local port (default: 8000). Use 0 to choose an available port.",
    )
    parser.add_argument(
        "--no-open", action="store_true",
        help="Start the server without opening a browser.",
    )
    args = parser.parse_args()

    site_directory = Path(__file__).resolve().parent
    handler = partial(PreviewHandler, directory=str(site_directory))
    try:
        server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    except OSError as error:
        if error.errno == errno.EADDRINUSE:
            parser.exit(
                1,
                f"Port {args.port} is already in use. "
                "Run again with --port 0 to choose an available port.\n",
            )
        parser.exit(1, f"Could not start the local preview: {error}\n")

    with server:
        url = f"http://127.0.0.1:{server.server_address[1]}/"
        print(f"Portfolio preview: {url}", flush=True)
        print("Keep this terminal open. Press Ctrl+C to stop.", flush=True)
        if not args.no_open:
            try:
                opened = webbrowser.open(url, new=0)
            except webbrowser.Error:
                opened = False
            if not opened:
                print("Open the address above in your browser.", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nPreview stopped.", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
