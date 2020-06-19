import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { DriverBoardService } from "../../../services/driver-board.service";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../../variables/charts";

@Component({
  selector: "app-user-board",
  templateUrl: "./user-board.component.html",
  styleUrls: ["./user-board.component.css"],
})
export class UserBoardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;

  constructor(private driverBoard: DriverBoardService) {}

  ngOnInit() {
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40],
    ];
    this.data = this.datasets[0];

    const chartOrders = document.getElementById("chart-orders");

    parseOptions(Chart, chartOptions());
    const ordersChart = new Chart(chartOrders, {
      type: "bar",
      options: chartExample2.options,
      data: chartExample2.data,
    });

    const chartSales = document.getElementById("chart-sales");

    this.salesChart = new Chart(chartSales, {
      type: "line",
      options: chartExample1.options,
      data: chartExample1.data,
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
