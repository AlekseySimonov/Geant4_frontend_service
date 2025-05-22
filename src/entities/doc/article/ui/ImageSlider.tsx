
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "./_imageSlider.module.scss";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface ImageSliderProps {
	urls: string[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ urls }) => {
	const [validUrls, setValidUrls] = useState<string[]>([]);
	useEffect(() => {
		setValidUrls(urls);
	}, [urls]);

	const handleImageError = (badUrl: string) => {
		setValidUrls((prev) => prev.filter(url => url !== badUrl));
	};

	if (!validUrls.length) return null;

	return (
		<div className={styles.slider}>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar]}
				slidesPerView={1}
				slidesPerGroup={1}
				spaceBetween={30}
				navigation={true}
				centeredSlides={true}
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
			>
				{validUrls.map((url, index) => (
					<SwiperSlide key={url}>
						<img
							src={url}
							alt={`image-${index}`}
							className={styles.image}
							onError={() => handleImageError(url)}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};