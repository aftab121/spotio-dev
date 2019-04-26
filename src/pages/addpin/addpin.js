var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AddpinProvider } from '../../providers/addpin/addpin';
import { FilterProvider } from '../../providers/filter/filter';
import { MapPage } from '../../pages/map/map';
/**
 * Generated class for the AddpinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddpinPage = /** @class */ (function () {
    function AddpinPage(navCtrl, navParams, _eref, addpinService, filterService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._eref = _eref;
        this.addpinService = addpinService;
        this.filterService = filterService;
        this.alertCtrl = alertCtrl;
        this.todo = {};
        this.custum = {};
        this.addpinfrm = {};
        this.options = [];
        this.selectedEntry = "";
        this.dropdown = true;
        this.statusId = "";
        this.assignedId = "";
        this.array = [];
        this.newModel = {};
        this.message = {};
        this.assignedTo = [];
        this.ddl = [{
                "id": 0,
                "name": "Select status...",
                "color": "#e60000"
            }];
        this.Status = [];
        this.userid = localStorage.getItem('users_data');
        //debugger; 
        this.addpinfrm = this.navParams.data.sort(function (a, b) { return a.sort <= b.sort ? -1 : 1; });
        this.userData();
    }
    AddpinPage.prototype.onClick = function (event) {
        // if (!this._eref.nativeElement.contains(event.target)) // or some similar check
        /*this.closeDdl();*/
    };
    AddpinPage.prototype.userData = function () {
        var _this = this;
        var userid = localStorage.getItem('users_data');
        this.filterService.getUser(userid).then(function (result) {
            if (result.resCode == 1) {
                _this.assignedTo = result.data;
            }
        });
        this.filterService.getPin(userid).then(function (result) {
            if (result.resCode == 1) {
                _this.Status = result.data;
            }
        });
    };
    /*closeDdl() {
        alert('c;osied');
    }*/
    AddpinPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddpinPage');
    };
    AddpinPage.prototype.ToggleDropDown = function () {
        this.dropdown = !this.dropdown;
    };
    AddpinPage.prototype.OnChange = function (obj, id) {
        this.ddl[0].name = obj;
        this.statusId = id;
        console.log(obj);
        this.dropdown = !this.dropdown;
    };
    AddpinPage.prototype.reformat = function (str) {
        if (str) {
            var st = str.replace(/\n/g, ',').split(',');
            return str.replace(/\n/g, ',').split(',');
        }
        return [];
    };
    AddpinPage.prototype.isAvailable = function (item) {
        if (item && item.indexOf('\n') !== -1) {
            return true;
        }
        return false;
    };
    AddpinPage.prototype.savePin = function () {
        var _this = this;
        debugger;
        this.todo.userid = localStorage.getItem('users_data');
        this.todo.current_status = this.statusId;
        this.todo.assigned_to = this.assignedId;
        this.todo.custom_input = this.custum;
        var json = JSON.stringify(this.todo);
        this.addpinService.AddMarker(json).then(function (result) {
            if (result.code == 1) {
                console.log("success");
                _this.navCtrl.setRoot(MapPage);
            }
            else if (result.code == 2) {
                _this.message = result.msg;
                _this.presentAlert(_this.message);
                console.log("error");
            }
        }, function (error) {
            console.log('error', JSON.stringify(error));
        });
        console.log(this.todo);
    };
    AddpinPage.prototype.onSelectionChange = function (name, entry) {
        this.selectedEntry = entry;
        this.custum[name] = entry;
    };
    AddpinPage.prototype.addCheckbox = function (event, val, name) {
        var x = this.custum[name];
        if (event.checked) {
            if (x != undefined) {
                if (val == "BothProduct" || x != val) {
                    this.custum[name] = "Both Product";
                    this.array.push(val);
                }
            }
            else {
                this.custum[name] = val;
                this.array.push(val);
            }
        }
        else {
            for (var key in this.array) {
                if (this.array[key] == val) {
                    delete this.array[key];
                }
            }
            var newArr = new Array();
            for (var k = 0; k < this.array.length; k++) {
                if (this.array[k] != undefined) {
                    newArr.push(this.array[k]);
                }
            }
            this.array = new Array();
            this.array = newArr;
            if (this.array.length == 1) {
                for (var i = 0; i < this.array.length; i++) {
                    this.custum[name] = this.array[i];
                }
            }
            else if (this.array.length > 1) {
                delete this.custum[name];
                this.custum[name] = "Both Product";
            }
            else {
                delete this.custum[name];
            }
        }
    };
    AddpinPage.prototype.changeAssignee = function (id, item) {
        document.getElementById('assigned').innerText = item;
        this.assignedId = id;
    };
    AddpinPage.prototype.presentAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    AddpinPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-addpin',
            templateUrl: 'addpin.html',
            host: {
                '(document:click)': 'onClick($event)',
            },
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ElementRef, AddpinProvider, FilterProvider, AlertController])
    ], AddpinPage);
    return AddpinPage;
}());
export { AddpinPage };
//# sourceMappingURL=addpin.js.map