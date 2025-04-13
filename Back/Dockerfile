FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY catalogo_de_productos.sln .

COPY Aplication/ Aplication/
COPY Domain.Model/ Domain.Model/
COPY Infrastructure/ Infrastructure/
COPY Transversal/ Transversal/
COPY catalogo_de_productos/ catalogo_de_productos/

RUN dotnet restore

COPY . .

RUN dotnet publish catalogo_de_productos/catalogo_de_productos.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "catalogo_de_productos.dll"]