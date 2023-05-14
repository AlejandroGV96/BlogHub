import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [AuthService, RouterModule],
})
export class ApiModule {}
