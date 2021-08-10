# Function with two params $1 $2 and returns a string
function sum {
  local p1
  local p2
  p1="$1"
  p2="$2"
  "echo" "-e" $(($p1 + $p2)) # -e interpret \n as newline
}
result=$(sum 1 2) # => 3
echo "The result is ${result}"
