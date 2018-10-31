pipeline {
  agent any
  stages {
    stage('Install dependencies') {
      steps {
        echo "Running '$ npm install'"
        sh 'npm install'
      }
    }
  }
  stages {
    stage('Test') {
      steps {
        echo "Testing ..."
        sh 'npm test'
      }
    }
    stage('Build') {
      steps {
        echo "Building ..."
        sh 'npm run build'
      }
    }
    stage('Deploy to apis.frederikheld.de/usmio') {
      steps {
        echo 'Deploying ...'
        withCredentials([usernamePassword(credentialsId: 'deploy-usm.io', usernameVariable: 'FTP_USER', passwordVariable: 'FTP_PW')]) {
            sh 'curl -T dist/usmio.min.js ftp://apis.frederikheld.de/ -u $FTP_USER:$FTP_PW --ftp-ssl'
        }
      }
    }
  }
}
