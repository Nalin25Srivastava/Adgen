import dns.resolver
import socket
import ssl
import sys

def check_dns(hostname):
    print(f"--- Checking DNS for {hostname} ---")
    try:
        # Check SRV record for Atlas
        srv_name = f"_mongodb._tcp.{hostname}"
        answers = dns.resolver.resolve(srv_name, 'SRV')
        for rdata in answers:
            print(f"SRV Target: {rdata.target}")
    except Exception as e:
        print(f"DNS SRV Lookup Failed: {e}")

    try:
        # Check A record
        ip = socket.gethostbyname(hostname)
        print(f"A Record: {ip}")
    except Exception as e:
        print(f"DNS A Record Lookup Failed: {e}")

def check_port(hostname, port):
    print(f"--- Checking Port {port} on {hostname} ---")
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)
        result = sock.connect_ex((hostname, port))
        if result == 0:
            print(f"Port {port} is OPEN")
        else:
            print(f"Port {port} is CLOSED (Code: {result})")
    except Exception as e:
        print(f"Port Check Error: {e}")
    finally:
        sock.close()

if __name__ == "__main__":
    atlas_host = "cluster0.dpdkhhz.mongodb.net"
    check_dns(atlas_host)
    check_port(atlas_host, 27017)
    # Also check a direct shard node if known from previous attempts
    shard0 = "ac-kscv88c-shard-00-00.dpdkhhz.mongodb.net"
    check_port(shard0, 27017)
