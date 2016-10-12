Programming Assignment 2

To use the chat program you need a server that was given with 
the programming assignment, the server is written in Node.js, 
which must therefore be installed.
Before the server can be started, the dependencies for it must 
be installed by navigating to the server folder in the command 
line, and executing the following command:

	npm -d install

Then, to start the server, execute the following command:

	node chatserver.js

This will start a socket.io server on port 8080.


Then there is the client 
You need to install Python (if you haven't already) and Git.
After that you need to install Bower. Then finally you can
download all the dependancies via Bower by typing in to the
comand line:

	bower install  Jquery
	bower install Angular
	bower install Angular-route
	bower install Bootstrap

And via npm type in:

	npm install socket.io

To run the client you type in the command or terminal 

	python -m SimpleHTTPServer

At last open your browser and use our wonderful chat my typing 

	localhost:8000

Enjoy :)