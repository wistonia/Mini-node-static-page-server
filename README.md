Demo app for Node HTTP
======================

1. Pre-configuration
--------------------
Host is a virtual Debian linux server running via KVM.

I created a DNS CNAME record for the node subdomain.  

squid proxy directs incoming requests to the appropriate server port.


2. Node.js Installation
-----------------------
node.js was built from source. I did this following the instructions at http://sekati.com/etc/install-nodejs-on-debian-squeeze with the following modifications:

    git clone https://github.com/joyent/node.git
    cd node
    git checkout v0.10.26		# The latest stable version of node.js at this time.
    
    ./configure --prefix=/usr/local	# node.js will be available on the PATH.
    make
    make test				# TLS server test failed, but this won't be used in production.
    sudo make install


3. Build HTTP Server
--------------------
Design:
The app needs to provide a response suitable for a web browser, a valid HTTP header and HTML body.
The server can be configured at run time.
The server logs basic information to the console.

The files were created directly on the server using Vim over SSH.

Syntax was verified with JSLint.
