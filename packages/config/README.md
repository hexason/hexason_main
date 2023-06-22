# Cofiguration




## Docker Hub

```
docker login
```


## Github Package

```
export CR_PAT=<PERSONAL_TOKEN>
echo $CR_PAT | docker login ghcr.io -u <USERNAME> --password-stdin
```