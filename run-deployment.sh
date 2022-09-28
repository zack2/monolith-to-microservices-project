kubectl delete deployments --all
kubectl delete services --all
kubectl delete pods --all

kubectl apply -f aws-secret.yaml
kubectl apply -f env-secret.yaml
kubectl apply -f env-configmap.yaml

kubectl apply -f backend-feed-deployment.yaml
kubectl apply -f backend-user-deployment.yaml
kubectl apply -f reverseproxy-deployment.yaml
kubectl apply -f frontend-deployment.yaml


kubectl apply -f backend-feed-service.yaml
kubectl apply -f backend-user-service.yaml
kubectl apply -f reverseproxy-service.yaml
kubectl apply -f frontend-service.yaml


kubectl expose deployment frontend --type=LoadBalancer --name=publicfrontend
kubectl expose deployment reverseproxy --type=LoadBalancer --name=publicreverseproxy

kubectl get deployments
kubectl get svc
kubectl get pods

kubectl create -f backend-feed-hpa
kubectl autoscale deployment backend-feed --cpu-percent=50 --min=3 --max=7
kubectl autoscale deployment backend-user --cpu-percent=50 --min=3 --max=7

kubectl get hpa backend-feed-hpa



