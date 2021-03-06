// Almost completely taken from react-image-crop docs
import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


export default class Selector extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: 'px',
      width: 128,
      aspect: 16 / 16,
    },
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        // 'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
      this.props.setCropped(croppedImageUrl)
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      resolve(canvas.toDataURL())
      // canvas.toBlob(blob => {
      //   if (!blob) {
      //     //reject(new Error('Canvas is empty'));
      //     console.error('Canvas is empty');
      //     return;
      //   }
      //   blob.name = fileName;
      //   window.URL.revokeObjectURL(this.fileUrl);
      //   this.fileUrl = window.URL.createObjectURL(blob);
      //   resolve(this.fileUrl);
      // }, 'image/jpeg');

    });
  }

  render() {
    // const { crop, croppedImageUrl, src } = this.state;
    const crop = this.state.crop,
      src = this.props.image

    return (
      <div id="selector" style={{
        minHeight: '75vh'
      }}>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
      </div>
    );
  }
}
