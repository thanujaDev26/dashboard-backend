pipeline {
    agent any

    stages {
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'main' , url: 'https://github.com/thanujaDev26/dashboard-backend'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
               sh 'docker build -t thanujadev26/dashboard-backend:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps{
                withCredentials([string(credentialsId: 'dockerhub', variable: 'DOCKERHUB_TOKEN')]) {
                     sh "echo $DOCKERHUB_TOKEN | docker login -u thanujaDev26 --password-stdin"
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                sh 'docker push thanujaDev26/dashboard-backend:%BUILD_NUMBER%'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...' 
            }
        }
    }
    post{
        always {
            sh 'docker logout'
        }
    }
}