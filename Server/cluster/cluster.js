const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`);
    console.log(`numCpus: ${numCPUs}`);
    // CPU 개수만큼 워커 프로세스 생산
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    // 워커 프로세서가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커 프로세스가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        // cluster.fork()를 통해 다시 워커 프로세스 생성
        // cluster.fork();
    });
} else {
    // 워커들이 포트에서 대기
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello~ Node!</h1>');
        res.end('<p>Hello Cluster</p>');
        setTimeout(() => {
            // 워커 프로세스 존재를 확인하기 위해 1초마다 강제 종료
            process.exit(1);
        }, 1000);
    })
        .listen(8080, () => {
            console.log(`${process.pid}번 워커 실행`);
        });

}