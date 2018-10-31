pipeline {
  agent any
  stages {
    stage('Install dependencies') {
      steps {
        echo "Run '\$ npm install' ..."
        sh 'npm install'
      }
    }
    stage('Run tests') {
      steps {
        echo "Run tests ..."
        sh 'npm test'
      }
    }
    stage('Build') {
      steps {
        echo "Running build ..."
        sh 'npm run build'
      }
    }
    stage('Deploy to apis.frederikheld.de/usmio') {
      steps {
        echo 'Deploying to apis.frederikheld.de ...'
        withCredentials([usernamePassword(credentialsId: 'deploy-usm.io', usernameVariable: 'FTP_USER', passwordVariable: 'FTP_PW')]) {
            sh 'curl -T dist/usmio.min.js ftp://apis.frederikheld.de/ -u $FTP_USER:$FTP_PW --ftp-ssl --insecure'
        }
      }
    }
  }
}
