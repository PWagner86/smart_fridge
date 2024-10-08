import { Location } from "../utils/types";

export default class Weather {

    private weatherContainer: HTMLDivElement;

    constructor() {

        this.weatherContainer = document.querySelector('[data-weather-container]') as HTMLDivElement; 
    }

    public setWeatherIcon() {
        
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const location: Location = this.getLatLon(position);
                const url: string = this.formatURL(location.lat, location.lon);
                this.fetchData(url);
            });
        } else {
            alert('Geolocation is not alowed');
        }
    }

    private getLatLon(position: GeolocationPosition): Location {
        return {
            lat: position.coords.latitude.toFixed(2),
            lon: position.coords.longitude.toFixed(2)
        };
    }

    private formatURL(lat: string, lon: string): string {
        return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}1&current=temperature_2m,weather_code&timezone=Europe%2FBerlin`;
    }

    private async fetchData(url: string) {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            const iconCode: number = json.current.weather_code;
            const temp: string = `${Math.floor(json.current.temperature_2m)}°C`;
            const icon: string = this.getIcon(iconCode);
            this.setIcon(temp, icon);
        } catch(error) {
            console.error(error);
            this.setIcon('No Data');
        }
    }

    private getIcon(weatherCode: any): string {

        const className: string = 'header-weather-container-icon';

        switch(weatherCode) {
            case 0:
            case 1:
                return `<i class="${className} fa-solid fa-sun"></i>`;
            case 2:
                return `<i class="${className} fa-solid fa-cloud-sun"></i>`;
            case 3:
                return `<i class="${className} fa-solid fa-cloud"></i>`;
            case 45:
            case 48:
                return `<i class="${className} fa-solid fa-smog"></i>`;
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
            case 80:
            case 81:
            case 82:
                return `<i class="${className} fa-solid fa-cloud-showers-heavy"></i>`;
            case 71:
            case 73:
            case 75:
            case 77:
            case 85:
            case 86:
                return `<i class="${className} fa-solid fa-snowflake"></i>`;
            case 95:
            case 96:
            case 99:
                return `<i class="${className} fa-solid fa-cloud-bolt"></i>`;
            default:
                return `<i class="${className} fa-solid fa-sun"></i>`;
        }
    }

    private setIcon(temp: string = '', icon: string = '',) {
        this.weatherContainer.innerHTML = '';
        this.weatherContainer.innerHTML = `<h2>${temp}</h2> ${icon} `;
    }
}