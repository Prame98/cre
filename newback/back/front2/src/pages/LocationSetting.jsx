import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Layout } from '../components/element';

const { kakao, naver } = window;

function LocationSetting() {
    const navigate = useNavigate();
    const [mapState, setMapState] = useState(null);
    const [marker, setMarker] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // 회원가입 시 저장된 사용자 좌표를 가져옵니다.
    const X = parseFloat(sessionStorage.getItem('userAddressX'));
    const Y = parseFloat(sessionStorage.getItem('userAddressY'));

    const handleSearch = (event) => {
        if (event.key === "Enter") {
            navigate(`/BoardListShop/${searchTerm}`);
        }
    };

    useEffect(() => {
        if (!X || !Y) {
            alert("위치 정보가 없습니다. 회원가입을 다시 확인해주세요.");
            return;
        }

        // 지도 설정
        const Container = document.getElementById('map');
        const options = {
            center: new naver.maps.LatLng(Y, X),
            zoom: 10,
        };
        const map = new naver.maps.Map(Container, options);
        setMapState(map);

        // 마커 설정
        const markerOptions = {
            position: new naver.maps.LatLng(Y, X),
            map: map,
            icon: {
                content: '<div class="marker"></div>',
                anchor: new naver.maps.Point(12, 12),
            },
        };
        const newMarker = new naver.maps.Marker(markerOptions);
        setMarker(newMarker);

        // 마커 클릭 시 페이지 이동
        naver.maps.Event.addListener(newMarker, 'click', () => {
            navigate(`/BoardListShop/${searchTerm}`);
        });

    }, [X, Y, navigate, searchTerm]);

    return (
        <Layout>
            <SearchBar>
                <input
                    type="text"
                    placeholder="상점명 입력"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </SearchBar>
            <h1 style={{ fontSize: "25px" }}>동네 지도</h1>
            <MapArea>
                <div id='map' style={{ width: "100%", height: "500px" }}></div>
            </MapArea>
        </Layout>
    );
}

export default LocationSetting;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  padding: 8px;
  width: 90%;
  max-width: 500px;

  input {
    width: 100%;
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    &:focus {
      border-color: #5ca771;
      box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.2);
    }
    &::placeholder {
      color: #aaa;
      font-size: 14px;
    }
  }
`;

const MapArea = styled.section`
    width: 100%;
    height: 500px;
    margin-top: 20px;
`;

