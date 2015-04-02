
/** Given a service name and a port number, get a URL to that service.
 *  @param {String} name the name of the service, like "redis."
 *  @param {Number} defaultPort the default port number of the service, like 6379.
 *  @param {String} defaultHost the host to default back to, like localhost or 127.0.0.1. We use
 *  127.0.0.1 if nothing is supplied.
 *  @param {String} defaultProtocol the default protocol of the service, like tcp or udp.
 *  We use "tcp" if nothing is supplied.
 *  @returns {String} the URL of the service that we discovered either by looking at:
 *  1. SERVICE_NAME_URL (override),
 *  2. SERVICE_NAME_PORT_9999_TCP/UDP (Docker), or
 *  3. defaultProtocol://defaultHost:defaultPort.
 */
module.exports = function serviceUrlFinder(name, defaultPort, defaultHost, defaultProtocol) {

  if (arguments.length < 2) {
    throw new Error('You must supply a name and default port to serviceUrlFinder!');
  }

  if (!defaultHost) {
    defaultHost = '127.0.0.1';
  }

  if (!defaultProtocol) {
    defaultProtocol = name;
  }

  defaultProtocol = defaultProtocol.toLowerCase().replace(/[^A-Za-z0-9]+/g, '-');

  // first, try environment
  var environmentVariablePrefix = name.toUpperCase().replace(/[^A-Za-z0-9]/g, '_');

  if (process.env.hasOwnProperty(environmentVariablePrefix + '_URL')) {
    return process.env[environmentVariablePrefix + '_URL'];
  }

  // next, try Docker
  var dockerPortPrefix = environmentVariablePrefix + '_PORT_' + defaultPort;
  if (process.env.hasOwnProperty(dockerPortPrefix + '_TCP') && defaultProtocol !== 'udp') {
    return process.env[dockerPortPrefix + '_TCP'];
  } else if (process.env.hasOwnProperty(dockerPortPrefix + '_UDP')) {
    return process.env[dockerPortPrefix + '_UDP'];
  }

  // next, just do localhost
  return defaultProtocol + '://' + defaultHost  + ':' + defaultPort;

}
