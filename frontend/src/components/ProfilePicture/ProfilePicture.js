import React, { useEffect, useState } from 'react';

import { useDropzone } from 'react-dropzone';

import imageStore from '../../store/imageStore';
import useStyles from './styles';

// image uploader component using react-dropzone
const DragNDrop = () => {
  const classes = useStyles();
  const [errors, setErrors] = useState('');

  const files = imageStore((state) => state.files);
  const setFiles = imageStore((state) => state.setFiles);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    maxSize: 1024 * 1024 * 5,
    onDrop: (acceptedFiles, fileRejections) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
          setErrors(''),
        ),
      );
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          setErrors(`Error: ${err.message}`);
        });
      });
    },
  });
  // create thumbs for preview
  const thumbs = files?.map((file) => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <img alt="img" src={file.preview} className={classes.img} />
      </div>
    </div>
  ));
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files?.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <section className={classes.container}>
      <div {...getRootProps({ className: classes.dropzone })}>
        <input {...getInputProps()} />
        <p className={classes.text}>
          {/* classsic text for the image upload area */}
          Profile Picture
        </p>
      </div>
      {/* Error Message for not supported images */}
      <p style={{ color: 'red', padding: 5, margin: 0, fontSize: 14 }}>
        {errors}
      </p>
      <aside className={classes.thumbsContainer}>{thumbs}</aside>
    </section>
  );
};

export default DragNDrop;
