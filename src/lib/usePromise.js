import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps){
    // 대기 중/완료/실패에 대한 상태 관리
    const [loading, setLoading] = useState(false);
    const [resolved, setResolved] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const process = async () => {
            setLoading(true);
            try {
                const resolved = await promiseCreator();
                setResolved(resolved);
            } catch(error) {
                setError(error);
            }
            setLoading(false);
        };
        process();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return [loading, resolved, error];
}

/*

프로젝트의 다양한 곳에서 사용될 수 있는 유틸 함수들은 src 디렉터리에 lib 디렉터리를 만든 후 그안에 작성

usePromise의 Hook은 Promise 의 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리

usePromise 내부에서 사용한 useEffect 의 의존 배열로 설정

*/