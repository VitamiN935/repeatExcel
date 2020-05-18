console.log('!!!! TEST');

async function start() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 0);
  })
}

start();

