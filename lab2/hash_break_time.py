import hashlib
import itertools
import time


ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:'\"<>,.?/|~`"
MAX_LENGTH = 2
LOG_EVERY_ATTEMPT = True
TARGETS = ["Gguu755fghghIYEQ$^@!dhjwk3208!GJHUIuihg", "students123"]  # long password first, then student password


def sha256_hex(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def brute_force(target: str, alphabet: str, max_length: int):
    target_hash = sha256_hex(target)
    start = time.perf_counter()
    attempts = 0

    for length in range(1, max_length + 1):
        for chars in itertools.product(alphabet, repeat=length):
            guess = "".join(chars)
            attempts += 1

            if LOG_EVERY_ATTEMPT:
                print(f"[{time.strftime('%H:%M:%S')}] Target={target} Attempt={attempts}: {guess}")

            if sha256_hex(guess) == target_hash:
                elapsed = time.perf_counter() - start
                print(f"FOUND: target={target} guess={guess} attempts={attempts} time={elapsed:.6f}s")
                return {
                    "target": target,
                    "found": guess,
                    "attempts": attempts,
                    "time_seconds": elapsed,
                    "status": "found",
                }

    elapsed = time.perf_counter() - start
    print(f"NOT FOUND: target={target} attempts={attempts} time={elapsed:.6f}s")
    return {
        "target": target,
        "found": None,
        "attempts": attempts,
        "time_seconds": elapsed,
        "status": "not_found",
    }


if __name__ == "__main__":
    print("SHA-256 hashes of the targets:")
    for target in TARGETS:
        print(f"{target} -> {sha256_hex(target)}")

    print("\nReal-time brute-force log:")
    print(f"Alphabet: {ALPHABET}")
    print(f"Max length tested: {MAX_LENGTH}")
    print()

    for target in TARGETS:
        print(f"=== Cracking target: {target} ===")
        result = brute_force(target, ALPHABET, MAX_LENGTH)
        print(f"Result: target={result['target']} status={result['status']} attempts={result['attempts']} time={result['time_seconds']:.6f}s")
        print()
