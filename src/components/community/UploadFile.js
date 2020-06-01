import React, { useMemo, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { AiOutlineArrowUp } from 'react-icons/ai'

export default function UploadFile(props) {
  const [uploadFile, setUploadFile] = useState([])
  const [image, setImage] = useState('')

  // console.log(props.uploadImage)
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setUploadFile(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  useEffect(() => {
    setImage(acceptedFiles)
  }, [acceptedFiles])

  useEffect(() => {
    props.getStateImagefromchild(image)
  }, [image])

  const thumbs = uploadFile.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      uploadFile.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [uploadFile]
  )

  // const files = acceptedFiles.map(file => file)
  // console.log(files)

  // const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>)

  // console.log(files)

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragAccept, isDragActive, isDragReject]
  )

  return (
    <>
      <section className="my-5" style={{ position: 'relative' }}>
        <div {...getRootProps({ style })}>
          <div>
            <input
              {...getInputProps()}
              name="communityImage"
              // onChange={e => console.log(e)}
            />
            <div style={uploadicon}>
              <AiOutlineArrowUp style={{ fontSize: '35px', color: '' }} />
            </div>
            <br />
            <span
              className="d-block my-2"
              style={{
                fontSize: '18px',
              }}
            >
              點擊或拖拉圖片到虛線框內上傳
              <br />
              只支持 PNG 和 JPG 等類型圖片檔案
            </span>
          </div>
        </div>

        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
      {/* <div>{files}</div> */}
    </>
  )
}

const baseStyle = {
  display: 'flex',
  position: 'relative',
  height: '400px',
  width: '550px',
  margin: '10px 20px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,
  border: '3px dashed #eeeeee',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  textAlign: 'center',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const activeStyle = {
  borderColor: '#79cee2',
}

const acceptStyle = {
  borderColor: '#79cee2',
  color: '#79cee2',
}

const rejectStyle = {
  borderColor: '#ff1744',
}
const uploadicon = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  border: '2px dotted #ADB6BD',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px auto',
}

// preview

const thumbsContainer = {
  // display: 'flex',
  // flexDirection: 'row',
  // flexWrap: 'wrap',
  // marginTop: 16,
}

const thumb = {
  display: 'inline-flex',
  position: 'absolute',
  top: '0',
  margin: '6px 17px',
  width: '560px',
  height: '410px',
  padding: 4,
  boxSizing: 'border-box',
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
}
