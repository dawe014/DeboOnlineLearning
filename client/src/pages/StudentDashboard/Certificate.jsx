import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import certificateTemp from '../../assets/images/certificate1.png';
import { useParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';

const Certificate = () => {
  const certificateRef = useRef(null);
  const { courseId } = useParams(); // Extract courseId from URL
  console.log(courseId)
const [certificateData, setCertificateData] = useState({
  userName: '',
  courseName: '',
});

useEffect(() => {
  const fetchCertificateData = async () => {
    try {
      const response = await apiClient.get(`/api/v1/certificate/${courseId}`);
      console.log('response', response);
      if (response.statusText !== 'OK') {
        throw new Error('Failed to fetch certificate details');
      }
      console.log('certificate data', response.data)
      setCertificateData(response.data);
    } catch (error) {
      console.error('Error fetching certificate data:', error);
    }
  };

  fetchCertificateData();
}, [courseId]);
console.log(certificateData)
  const downloadCertificate = async () => {
    console.log('dawe certificate')
    if (certificateRef.current) {
      // Capture the certificate as an image
      const canvas = await html2canvas(certificateRef.current);
      const imgData = canvas.toDataURL('image/png');

      // Create a PDF and add the image
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('certificate.pdf');
    }
  };

  return (
    <div className="container mx-auto relative mb-16 ">
      <div
        ref={certificateRef}
        className="relative transform scale-100 sm:scale-90 md:scale-100"
        style={{
          width: '1123px', // Fixed width
          height: '794px', // Fixed height
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={certificateTemp}
          alt="Certificate Template"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
        <div
          className="content"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Name */}
          <h1
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#1e293b',
              fontSize: '32px',
              marginTop: '-105px',
            }}
          >
            {certificateData.userName}
          </h1>
          {/* Course Title */}
          <p
            style={{
              textAlign: 'center',
              fontWeight: 'semibold',
              color: '#1e2934',
              fontSize: '24px',
              marginTop: '33px',
              marginLeft: '270px',
            }}
          >
            {certificateData.courseName}
          </p>
        </div>
      </div>
      {/* Download Button */}
      <div
        style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
        
      >
        <button
          onClick={downloadCertificate}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer',
            minWidth: 'auto', // Ensures the width is auto

            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1d4ed8')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#2563eb')}
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};
export default Certificate;
