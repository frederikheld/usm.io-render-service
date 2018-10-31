pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        echo "Testing ..."
        npm test
      }
    }
    stage('Build') {
      steps {
        echo "Building ..."
        npm run build
      }
    }
    stage('Deploy to FTP') {
      steps {
        echo 'Deploying ...'
        withCredentials([usernamePassword(credentialsId: 'deploy-usm.io', usernameVariable: 'FTP_USER', passwordVariable: 'FTP_PW')]) {
            sh 'curl -T dist/usmio.min.js ftp://dev.frederikheld.de/ -u $FTP_USER:$FTP_PW'
        }
      }
    }
  }
}
