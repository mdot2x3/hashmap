export const HashMap = () => {
  const loadFactor = 0.75;
  let capacity = 16;
  const buckets = new Array(capacity).fill(null);

  // helper function - create linked list node objects
  function Node(key, value, next = null) {
    return { key, value, next };
  }

  // method - takes a key and produces a hash code with it
  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      // generate hash code value, then use modulus to avoid integer overflow for long keys
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  // method - set key/value pair Node to a bucket, or updates value
  function set(key, value) {
    // determine a bucket number and set the key/value
    const index = hash(key) % capacity;
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    // if the bucket is empty, add a new node
    if (!buckets[index]) {
      buckets[index] = Node(key, value);
    } else {
      // else, if bucket is not empty, traverse the bucket's linked list
      let currentBucket = buckets[index];
      while (true) {
        // if a node with that key already exists, update its value
        if (currentBucket.key === key) {
          currentBucket.value = value;
          return;
        }
        // if you reach the end of the list, break and append a new node
        if (!currentBucket.next) break;
        currentBucket = currentBucket.next;
      }
      // if key not found, append new node
      currentBucket.next = Node(key, value);
    }

    // check load factor and resize if needed
    if (length() >= loadFactor * capacity) {
      const oldBuckets = buckets.slice();
      capacity = Math.floor(capacity * 2);
      buckets.length = capacity;
      buckets.fill(null);

      // rehash all existing key/value nodes
      for (let node of oldBuckets) {
        let currentBucket = node;
        // while another node in the linked list exists
        while (currentBucket) {
          set(currentBucket.key, currentBucket.value);
          // set currentBucket to the next linked list node (if it exists)
          currentBucket = currentBucket.next;
        }
      }
    }
  }

  // method - returns the value assigned to this key
  function get(key) {
    const index = hash(key) % capacity;
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    let currentBucket = buckets[index];
    while (currentBucket) {
      if (currentBucket.key === key) {
        return currentBucket.value;
      }
      currentBucket = currentBucket.next;
    }
    return null;
  }

  // method - returns true or false based on whether or not the key is in the hash map
  function has(key) {
    const index = hash(key) % capacity;
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    let currentBucket = buckets[index];
    while (currentBucket) {
      if (currentBucket.key === key) {
        return true;
      }
      currentBucket = currentBucket.next;
    }
    return false;
  }

  // method - remove the entry with that key and return true
  function remove(key) {
    const index = hash(key) % capacity;
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    let currentBucket = buckets[index];
    let prev = null;
    while (currentBucket) {
      if (currentBucket.key === key) {
        if (prev) {
          // link the previous and next nodes
          prev.next = currentBucket.next;
        } else {
          currentBucket = currentBucket.next;
        }
        return true;
      }
      prev = currentBucket;
      currentBucket = currentBucket.next;
    }
    return false;
  }

  // method - returns the number of stored keys
  function length() {
    let count = 0;
    for (let node of buckets) {
      let currentBucket = node;
      while (currentBucket) {
        count++;
        currentBucket = currentBucket.next;
      }
    }
    return count;
  }

  // method - removes all entries in the hash map
  function clear() {
    buckets.fill(null);
  }

  // method - returns an array containing all the keys inside the hash map
  function keys() {
    const keyArray = [];
    for (let node of buckets) {
      let currentBucket = node;
      while (currentBucket) {
        keyArray.push(currentBucket.key);
        currentBucket = currentBucket.next;
      }
    }
    return keyArray;
  }

  // method - returns an array containing all the values
  function values() {
    const valueArray = [];
    for (let node of buckets) {
      let currentBucket = node;
      while (currentBucket) {
        valueArray.push(currentBucket.value);
        currentBucket = currentBucket.next;
      }
    }
    return valueArray;
  }

  // method - returns an array that contains each key/value pair
  function entries() {
    const comboArray = [];
    for (let node of buckets) {
      let currentBucket = node;
      while (currentBucket) {
        comboArray.push([currentBucket.key, currentBucket.value]);
        currentBucket = currentBucket.next;
      }
    }
    return comboArray;
  }

  // debug method
  function getCapacity() {
    return capacity;
  }

  // debug method
  function bucketSizes() {
    return buckets.map((node) => {
      let count = 0;
      let currentBucket = node;
      while (currentBucket) {
        count++;
        currentBucket = currentBucket.next;
      }
      return count;
    });
  }

  return {
    Node,
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    getCapacity,
    bucketSizes,
  };
};
