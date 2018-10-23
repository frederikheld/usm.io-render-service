pipeline {
  agent any
  stages {
    stage('Minify') {
      steps {
        sh 'echo "minified js" > usmio.min.js'
      }
    }
    stage('Deploy to FTP') {
      steps {
        echo 'Deploying ...'
        withCredentials([usernamePassword(credentialsId: 'deploy-usm.io', usernameVariable: 'FTP_USER', passwordVariable: 'FTP_PW')]) {
            sh 'curl -T usmio.min.js ftp://dev.frederikheld.de/ -u $FTP_USER:$FTP_PW'
        }
      }
    }
  }
}
