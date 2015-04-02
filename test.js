
'use strict';

var expect = require('chai').expect,
  serviceUrlFinder = require('./index');

describe('serviceUrlFinder', function() {

  it('discovers service URL overrides on SERVICE_NAME_URL', function() {
    process.env['SOME_SERVICE_URL'] = 'service://1.3.1.3:666';
    expect(serviceUrlFinder('some-service', 666)).to.equal('service://1.3.1.3:666');
    delete process.env['SOME_SERVICE_URL'];
  });

  it('discovers docker URLs on SERVICE_NAME_PORT_9999_TCP', function() {
    process.env['SOME_SERVICE_PORT_666_TCP'] = 'tcp://1.3.3.1:666';
    expect(serviceUrlFinder('some-service', 666)).to.equal('tcp://1.3.3.1:666');
    delete process.env['SOME_SERVICE_PORT_666_TCP'];
  });

  it('discovers docker URLs on SERVICE_NAME_PORT_9999_UDP', function() {
    process.env['SOME_SERVICE_PORT_666_UDP'] = 'udp://1.3.3.1:666';
    expect(serviceUrlFinder('some-service', 666)).to.equal('udp://1.3.3.1:666');
    delete process.env['SOME_SERVICE_PORT_666_UDP'];
  });

  it('falls back to defaultHost if all other options fail', function() {
    expect(serviceUrlFinder('some-service', 666, '1.3.1.3')).to.equal('some-service://1.3.1.3:666');
  });

  it('falls back to 127.0.0.1 if defaultHost was not supplied', function() {
    expect(serviceUrlFinder('some-service', 666)).to.equal('some-service://127.0.0.1:666');
  });

});
