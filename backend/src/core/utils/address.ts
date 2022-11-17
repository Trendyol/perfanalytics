import * as ip from 'ip';
import * as dns from 'dns';

export const checkPublicAddress = async (addr: string) => {
  try {
    const hostname = new URL(addr).hostname;
    const ip4Addresses = await new Promise((resolve, reject) => {
      dns.resolve4(hostname, (err, records) => resolve(records));
    });
    const ip6Addresses = await new Promise((resolve, reject) => {
      dns.resolve6(hostname, (err, records) => resolve(records));
    });
    let ipAddresses = [];
    if (ip4Addresses) {
      ipAddresses = ipAddresses.concat(ip4Addresses);
    }
    if (ip6Addresses) {
      ipAddresses = ipAddresses.concat(ip6Addresses);
    }

    const result =
      !!ipAddresses.length &&
      ipAddresses.every((ipAddr) => ip.isPublic(ipAddr));
    return result;
  } catch (error) {
    return false;
  }
};
