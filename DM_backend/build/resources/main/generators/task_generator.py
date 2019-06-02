import sys
import random


def generate_task(n: int):
    min_number = 10 ** (n - 1)
    max_number = 10 ** n - 1

    while True:
        a = random.randint(min_number, max_number)
        b = random.randint(min_number, max_number)
        a_plus_b = a + b
        if a_plus_b > max_number:

            continue

        break

    print(f"Сложите ${a}$ и ${b}$.\n")
    print("% == разделитель условия и ответа ==\n")
    print(f"Ответ: ${a} + {b} = {a_plus_b}$.")


if __name__ == "__main__":
    rand_seed = int(sys.argv[1])

    random.seed(rand_seed)

    n: int

    if len(sys.argv) <= 2:
        n = random.randint(3, 5)
    else:
        n = int(sys.argv[2])

    if 1 < n < 8:
        generate_task(n)
