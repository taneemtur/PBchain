import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef
  fileAttr = 'Choose File';

  cities = ["NONE","KARACHI", "LAHORE", "HYDERABAD", "ISLAMABAD"];
  propertyTypes = ['Flat', 'Commercial', 'Home', 'Portion', 'Room'];
  selectedPropertyType : string;
  selectedCity : string;
  location : string;
  purpose : string;
  description : string;
  area : number;
  price : number;
  washroom : number;
  extraRooms : number;
  bedroom : number;
  address : string;

  images : any[] = [];

  user : any

  selectedFile : any;

  constructor(
    private propertyService : PropertyService,
    private _snackBar : MatSnackBar,
    private router : Router, 
    private loginService : LoginService
    ) { }

  ngOnInit(): void {
    this.loginService.getData()
      .subscribe(user => {
        this.user = user
      })
  }

  onSubmit() {
    let propertyData = {
      propertyType : this.selectedPropertyType,
    propertyCity : this.selectedCity,
    propertyLocation : this.location,
    propertyBedrooms : this.bedroom,
    propertyWashrooms : this.washroom,
    propertyPurpose : this.purpose,
    propertyCost : this.price,
    propertyArea : this.area,
    propertyDescription : this.description,
    propertyAddress : this.address,
    propertyTotalRooms : this.bedroom + this.extraRooms,
    userId : this.user.userId,
    images : this.images
    }

    this.propertyService.addProperty(propertyData)
    .subscribe(res => {
      console.log(res)
      if(res.success) {
        this._snackBar.open("Successfully added property.", "", {
          duration: 2000,
        });
    
        this.router.navigate(['/listing'])
      }
      else { 
        this._snackBar.open("Failed to add property.", "", {
          duration: 2000,
        });
      }
    })
  }

  onUpload(imgFile: any) {
    // this.selectedFile = event.target.files[0];
    // const fileReader = new FileReader();
    // fileReader.readAsText(this.selectedFile, "UTF-8");
    // fileReader.onload = () => {
    //   let fileJson = JSON.parse(fileReader.result as string)
    //   // this.inputService.updateData(fileJson.data)
    //   console.log(fileJson)
    // }
    // fileReader.onerror = (error) => {
    //   console.log(error);
    // }

    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      let imgs = Array.from(imgFile.target.files);
      for (let i=0; i<imgs.length; i++) {
        let reader = new FileReader();
        reader.onload = ((e : any) => {
          this.images.push(e.target.result);
        })
        reader.readAsDataURL(imgFile.target.files[i]);  
      }
      // HTML5 FileReader API
      // let reader = new FileReader();
      // reader.onload = (e: any) => {
      //   let image = new Image();
      //   image.src = e.target.result;
      //   image.onload = rs => {
      //     let imgBase64Path = e.target.result;
      //   };
      // };

      // console.log(this.images)
      // reader.readAsDataURL(imgFile.target.files[0]);
      
      // Reset if duplicate image uploaded again
      // this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      console.log(imgFile.target.files[0])
      reader.readAsDataURL(imgFile.target.files[0]);
      
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

}
