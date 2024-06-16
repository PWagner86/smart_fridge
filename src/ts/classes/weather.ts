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
                const iconCode = this.fetchData(url);
                const icon: string = this.getIcon(iconCode);
                this.setIcon(icon);
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
        return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&daily=weather_code&timezone=GMT`;
    }

    private async fetchData(url: string) {
        try {
            const response = await fetch(url);
            const json = await response.json();
            const icon: number = json.hourly.weather_code[0];
            return icon;
        } catch(error) {
            console.error(error);
        }
    }

    private getIcon(weatherCode: any): string {

        const className: string = 'header-weather-container-icon';

        switch(weatherCode) {
            case 0 || 1:
                return `<i class="${className} fa-solid fa-sun"></i>`;
            case 2:
                return `<i class="${className} fa-solid fa-cloud-sun"></i>`;
            case 3:
                return `<i class="${className} fa-solid fa-cloud"></i>`;
            case 45 || 48:
                return `<i class="${className} fa-solid fa-smog"></i>`;
            case 51|| 53 || 55 || 56 || 57 || 61 || 63 || 65 || 66 || 67 || 80 || 81 || 82:
                return `<i class="${className} fa-solid fa-cloud-showers-heavy"></i>`;
            case 71 || 73 || 75 || 77 || 85 || 86:
                return `<i class="${className} fa-solid fa-snowflake"></i>`;
            case 95 || 96 || 99:
                return `<i class="${className} fa-solid fa-cloud-bolt"></i>`;
            default:
                return `<i class="${className} fa-solid fa-sun"></i>`;
        }
    }

    private setIcon(icon: string) {
        this.weatherContainer.innerHTML = icon;
    }
}