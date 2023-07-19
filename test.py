import sys

def write_to_new_file(numbers, filename):
    with open(filename, 'w') as file:
        file.write(','.join(str(num) for num in numbers))

def append_to_parent_file(numbers, filename):
    with open(filename, 'a') as file:
        file.write(','.join(str(num) for num in numbers))
        file.write(',')

def main():
    if len(sys.argv) < 2:
        print("Usage: python program.py num1 num2 num3 ...")
        sys.exit(1)

    numbers = [int(arg) for arg in sys.argv[1:]]
    new_filename = "./new_numbers.txt"
    parent_filename = "./parent_numbers.txt"

    write_to_new_file(numbers, new_filename)
    append_to_parent_file(numbers, parent_filename)

if __name__ == "__main__":
    main()
